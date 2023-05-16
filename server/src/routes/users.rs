use crate::Error;
use axum::routing::{get, post};
use axum::{response::IntoResponse, Extension, Json, Router};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;

pub fn create_router() -> axum::Router {
    Router::new()
        .route("/signup", post(signup))
        .route("/login", post(login))
        .route("/me", get(me))
}

#[derive(Debug, Deserialize, Serialize)]
struct SignupPayload {
    first_name: String,
    last_name: String,
    password: String,
    phone_number: String,
}

#[axum_macros::debug_handler]
async fn signup(
    Extension(pool): Extension<PgPool>,
    Json(signup): Json<SignupPayload>,
) -> impl IntoResponse {
    let key = b"secret";
    // let token = match encode(&Header, &signup, &EncodingKey::from_secret(key)) {
    //     Ok(t) => t,
    //     Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, "error while encoding token").into_response(),
    // };

    Json(signup)
}

#[derive(Debug, Deserialize, Serialize)]
struct LoginPayload {
    username: String,
    password: String,
}

async fn login(
    Extension(pool): Extension<PgPool>,
    Json(payload): Json<LoginPayload>,
) -> impl IntoResponse {
    if payload.username != "admin" || payload.password != "admin" {
        return Err(Error::LoginFail);
    }

    Ok(Json(json!({"token": "Bearer token"})))
}

async fn me(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}

async fn refresh(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}
