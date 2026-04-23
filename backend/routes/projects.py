from typing import List

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from auth.dependencies import require_admin
from models.project import ProjectCreate, ProjectResponse, ProjectUpdate
from utils.database import get_projects_collection
from utils.serialization import serialize_project, utc_now


router = APIRouter(prefix="/api", tags=["projects"])


def _normalize_project_input(payload: ProjectCreate | ProjectUpdate) -> dict:
    data = payload.model_dump()
    data["software"] = [item.strip() for item in data["software"] if item and item.strip()]
    data["extraDetails"] = sorted(data["extraDetails"], key=lambda item: item["stepNumber"])
    return data


@router.get("/projects", response_model=List[ProjectResponse])
async def get_published_projects():
    collection = get_projects_collection()
    docs = await collection.find({"status": "published"}).sort("updatedAt", -1).to_list(1000)
    return [serialize_project(doc) for doc in docs]


@router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project_by_id(project_id: str):
    collection = get_projects_collection()
    try:
        object_id = ObjectId(project_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found") from exc

    doc = await collection.find_one({"_id": object_id, "status": "published"})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return serialize_project(doc)


@router.get("/admin/projects", response_model=List[ProjectResponse])
async def get_all_projects(_: str = Depends(require_admin)):
    collection = get_projects_collection()
    docs = await collection.find({}).sort("updatedAt", -1).to_list(1000)
    return [serialize_project(doc) for doc in docs]


@router.post("/admin/projects", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(payload: ProjectCreate, _: str = Depends(require_admin)):
    collection = get_projects_collection()
    now = utc_now()
    doc = _normalize_project_input(payload)
    doc["createdAt"] = now
    doc["updatedAt"] = now

    result = await collection.insert_one(doc)
    created_doc = await collection.find_one({"_id": result.inserted_id})
    return serialize_project(created_doc)


@router.put("/admin/projects/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: str, payload: ProjectUpdate, _: str = Depends(require_admin)):
    collection = get_projects_collection()
    try:
        object_id = ObjectId(project_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found") from exc

    doc = _normalize_project_input(payload)
    doc["updatedAt"] = utc_now()
    result = await collection.update_one({"_id": object_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    updated_doc = await collection.find_one({"_id": object_id})
    return serialize_project(updated_doc)


@router.delete("/admin/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str, _: str = Depends(require_admin)):
    collection = get_projects_collection()
    try:
        object_id = ObjectId(project_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found") from exc

    result = await collection.delete_one({"_id": object_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
