from motor.motor_asyncio import AsyncIOMotorClient

from utils.config import DB_NAME, MONGO_URL


client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]


def get_projects_collection():
    return db.projects


def get_contact_messages_collection():
    return db.contact_messages
