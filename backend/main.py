import logging

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes.admin_auth import router as admin_auth_router
from routes.analytics import router as analytics_router
from routes.contact_messages import router as contact_messages_router
from routes.health import router as health_router
from routes.projects import router as projects_router
from utils.config import CORS_ORIGINS
from utils.database import client


app = FastAPI()
app.include_router(health_router)
app.include_router(admin_auth_router)
app.include_router(analytics_router)
app.include_router(contact_messages_router)
app.include_router(projects_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
