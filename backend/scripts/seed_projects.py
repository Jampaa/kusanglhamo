import asyncio
import json
from pathlib import Path
import sys

from motor.motor_asyncio import AsyncIOMotorClient

BACKEND_ROOT = Path(__file__).resolve().parent.parent
if str(BACKEND_ROOT) not in sys.path:
    sys.path.append(str(BACKEND_ROOT))

from utils.config import DB_NAME, MONGO_URL
from utils.serialization import utc_now


SEED_PATH = BACKEND_ROOT / "seed" / "projects.seed.json"


async def seed_projects():
    if not SEED_PATH.exists():
        raise FileNotFoundError(f"Seed file not found: {SEED_PATH}")

    with SEED_PATH.open("r", encoding="utf-8") as file:
        projects = json.load(file)

    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    collection = db.projects
    now = utc_now()

    inserted = 0
    updated = 0

    for project in projects:
        project["createdAt"] = now
        project["updatedAt"] = now
        project["extraDetails"] = sorted(project.get("extraDetails", []), key=lambda item: item["stepNumber"])
        project["software"] = [item.strip() for item in project.get("software", []) if item and item.strip()]

        selector = {"title": project["title"], "year": project["year"]}
        existing = await collection.find_one(selector)
        if existing:
            project["createdAt"] = existing.get("createdAt", now)
            await collection.update_one({"_id": existing["_id"]}, {"$set": project})
            updated += 1
        else:
            await collection.insert_one(project)
            inserted += 1

    client.close()
    print(f"Seed complete. Inserted: {inserted}, Updated: {updated}")


if __name__ == "__main__":
    asyncio.run(seed_projects())
