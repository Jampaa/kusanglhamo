from typing import List

from fastapi import APIRouter, Depends, status

from auth.dependencies import require_admin
from models.contact_message import ContactMessageCreate, ContactMessageResponse
from utils.database import get_contact_messages_collection
from utils.serialization import serialize_contact_message, utc_now


router = APIRouter(prefix="/api", tags=["contact-messages"])


@router.post("/contact/messages", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_message(payload: ContactMessageCreate):
    collection = get_contact_messages_collection()

    doc = {
        "name": payload.name.strip(),
        "email": str(payload.email).strip().lower(),
        "message": payload.message.strip(),
        "createdAt": utc_now(),
    }
    result = await collection.insert_one(doc)
    created_doc = await collection.find_one({"_id": result.inserted_id})
    return serialize_contact_message(created_doc)


@router.get("/admin/messages", response_model=List[ContactMessageResponse])
async def get_admin_messages(_: str = Depends(require_admin)):
    collection = get_contact_messages_collection()
    docs = await collection.find({}).sort("createdAt", -1).to_list(1000)
    return [serialize_contact_message(doc) for doc in docs]
