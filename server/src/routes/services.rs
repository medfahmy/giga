use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{delete, get, post, put};
use axum::{Extension, Json, Router};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use sqlx::{query, query_as};
use time::PrimitiveDateTime;

pub fn create_router() -> Router {
    Router::new()
        .route("/", get(get_services))
        .route("/:id", get(get_service_by_id))
        .route("/", post(post_service))
        .route("/:id", put(put_service))
        .route("/:id", delete(delete_service))
}

#[derive(Debug, Deserialize, Serialize)]
struct Service {
    id: i32,
    name: String,
    category_id: i32,
    provider_id: i32,
    consumer_id: i32,
    image_url: String,
    created_at: chrono::NaiveDateTime,
    updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
struct CreateService {
    name: String,
}

async fn get_services(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    let services: Vec<Service> = query_as!(Service, "select * from services")
        .fetch_all(&pool)
        .await
        .unwrap();
    Json(services)
}

async fn get_service_by_id(Extension(pool): Extension<PgPool>) -> impl IntoResponse {}

async fn post_service(
    Extension(pool): Extension<PgPool>,
    Json(service): Json<CreateService>,
) -> impl IntoResponse {
    // query!("insert into services (name) values ($1)", &service.name).execute(&pool).await.unwrap();
    (StatusCode::CREATED, Json(service))
}

async fn put_service(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}

async fn delete_service(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}
