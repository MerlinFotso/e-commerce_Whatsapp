-- TABLE 1 : PRODUITS
CREATE TABLE IF NOT EXISTS produits (
    id            SERIAL PRIMARY KEY,
    nom           VARCHAR(255) NOT NULL,
    description   TEXT,
    prix          NUMERIC(10, 2) NOT NULL CHECK (prix >= 0),
    stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    seuil_alerte  INTEGER NOT NULL DEFAULT 3,
    image_url     VARCHAR(500),
    categorie     VARCHAR(100),
    actif         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 2 : ADMINISTRATEURS
CREATE TABLE IF NOT EXISTS admin (
    id             SERIAL PRIMARY KEY,
    username       VARCHAR(100) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    role           VARCHAR(50) NOT NULL DEFAULT 'admin',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEX
CREATE INDEX IF NOT EXISTS idx_produits_actif ON produits(actif);
CREATE INDEX IF NOT EXISTS idx_produits_categorie ON produits(categorie);