use crate::Error;
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, SaltString},
    Argon2,
};
use axum::http::StatusCode;
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

#[derive(Debug, Deserialize, Serialize, sqlx::FromRow)]
struct User {
    id: i32,
    // email: String,
    phone: String,
    password_hash: String,
    // role_id: i32,
    // first_name: String,
    // last_name: String,
    // image_url: String,
    // location: String,
    created_at: chrono::NaiveDateTime,
    updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
struct SignupPayload {
    phone: String,
    password: String,
}

#[axum_macros::debug_handler]
async fn signup(
    Extension(pool): Extension<PgPool>,
    Json(signup): Json<SignupPayload>,
) -> impl IntoResponse {
    // let token = match encode(&Header, &signup, &EncodingKey::from_secret(key)) {
    //     Ok(t) => t,
    //     Err(_) => return (StatusCode::INTERNAL_SERVER_ERROR, "error while encoding token").into_response(),
    // };

    let user = sqlx::query_as!(User, "select * from users where phone = $1", signup.phone)
        .fetch_one(&pool)
        .await;

    if user.is_ok() {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "user already exists"})));
    }

    let salt = SaltString::generate(&mut OsRng);

    // Argon2 with default params (Argon2id v19)
    let argon2 = Argon2::default();

    // Hash password to PHC string ($argon2id$v=19$...)
    let password_hash = argon2.hash_password(signup.password.as_bytes(), &salt).unwrap().to_string();

    let user = sqlx::query_as!(
        User,
        r#"
        INSERT INTO users (phone, password_hash)
        VALUES ($1, $2)
        RETURNING id, phone, password_hash, created_at, updated_at
        "#,
        signup.phone,
        password_hash,
    ).fetch_one(&pool).await;

    match user {
        Ok(user) => (
            StatusCode::CREATED,
            Json(json!({"phone": user.phone, "created_at": user.created_at, "updated_at": user.updated_at})),
        ),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": format!("error while creating user: {}", e)})))
    }
}

#[derive(Debug, Deserialize, Serialize)]
struct LoginPayload {
    phone: String,
    password: String,
}

async fn login(
    Extension(pool): Extension<PgPool>,
    Json(payload): Json<LoginPayload>,
) -> impl IntoResponse {
    let user = sqlx::query_as!(User, "select * from users where phone = $1", payload.phone)
        .fetch_one(&pool)
        .await;

    if user.is_err() {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "user does not exist"})));
    }

    let user = user.unwrap();

    // Verify password against PHC string.
    // NOTE: hash params from `parsed_hash` are used instead of what is configured in the
    // `Argon2` instance.
 
    let parsed_hash = PasswordHash::new(&user.password_hash).unwrap();
    let valid =  Argon2::default()
        .verify_password(payload.password.as_bytes(), &parsed_hash)
        .is_ok();

    if !valid {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "invalid password"})));
    }

    (StatusCode::OK, Json(json!({"token": "TODO: Bearer token"})))
}

async fn me(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}

async fn refresh(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    todo!()
}
