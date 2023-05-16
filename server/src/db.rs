use anyhow::Result;
use sqlx::postgres::{PgPool, PgPoolOptions};

pub async fn create_pool(db_url: String) -> Result<PgPool> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(std::time::Duration::from_secs(3))
        .connect(&db_url)
        .await?;

    Ok(pool)
}
