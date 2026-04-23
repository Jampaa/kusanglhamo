from datetime import datetime


def serialize_project(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "title": doc["title"],
        "category": doc["category"],
        "year": doc["year"],
        "thumbnail": doc["thumbnail"],
        "hero": doc["hero"],
        "tagline": doc["tagline"],
        "overview": doc["overview"],
        "software": doc["software"],
        "polycount": doc.get("polycount", ""),
        "textures": doc.get("textures", ""),
        "renderer": doc.get("renderer", ""),
        "object3dUrl": doc.get("object3dUrl", ""),
        "status": doc["status"],
        "extraDetails": doc["extraDetails"],
        "createdAt": doc["createdAt"],
        "updatedAt": doc["updatedAt"],
    }


def serialize_contact_message(doc: dict) -> dict:
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "email": doc["email"],
        "message": doc["message"],
        "createdAt": doc["createdAt"],
    }


def utc_now() -> datetime:
    return datetime.utcnow()
