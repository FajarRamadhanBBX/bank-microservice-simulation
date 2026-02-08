# Bank Microservices Simulation 🏦
A scalable, secure, and containerized banking simulation system built with **Microservices Architecture**. This project demonstrates advanced DevOps practices including **Container Orchestration**, **Network Isolation**, **Automated CI/CD**, and **Self-Healing Infrastructure**.

---

## 🏗️ Architecture

The system follows a microservices pattern where services are decoupled and communicate via REST APIs, managed by an API Gateway.
<img width="3888" height="3448" alt="image" src="https://github.com/user-attachments/assets/c4df0b3d-7be5-4bec-b789-fd6ee1806877" />

---

## 🔒 Security & Infrastructure
### 1. Network Isolation:
- Implemented separate Docker networks: edge (public-facing) and backend (internal).
- Databases are strictly isolated in the backend network with internal: true flag, making them inaccessible from the outside world.

### 2.Resiliency & Self-Healing:
- Implemented Native Healthchecks (pg_isready & curl) in Docker Compose.
- Services utilize depends_on: service_healthy condition to ensure Zero-Crash Startup (waiting for DB readiness before booting).

### 3.Automated CI/CD Pipeline:
- GitHub Actions with Self-Hosted Runners.
- Automated Smoke Testing: Before deployment, a temporary container runs inside the internal network to validate API health (curl based testing).

---

## 🛠️ Tech Stack
- Runtime: Node.js (Express)
- Database: PostgreSQL 17 (Per-service Database)
- Orchestration: Docker & Docker Compose
- CI/CD: GitHub Actions, Bash Scripting

---

## 🔌 API Documentation
Base URL: `http://localhost:4000` (API Gateway)
### Auth Service
| Method | Endpoint | Desc |
|--------|--------|--------|
| `POST` | `/register` | register user |
| `POST` | `/login` | login user/admin |
| `PUT` | `/update-password` | update password by user |
| `PUT` | `/me/deactivate` | deactivate auth (for login) by user |
| `POST` | `/register/admin` | register admin |
| `GET` | `/admin/users` | display all authentication from user |
| `GET` | `/admin/users/email` | display user with exact email |
| `PUT` | `/admin/users/status` | update status user by admin |

### User Service
| Method | Endpoint | Desc |
|--------|--------|--------|
| `POST` | `/profiles` | create profile |
| `GET` | `/profiles/me` | get profile info |
| `PUT` | `/profiles/me` | update profile info |
| `GET` | `/admin/profiles` | get all profile by admin |

### Account Service
| Method | Endpoint | Desc |
|--------|--------|--------|
| `POST` | `/` | create account |
| `GET` | `/me` | get account info |
| `PUT` | `/admin/freeze` | freeze user accounts by admin |
| `GET` | `/lookup` | see account information (used when measure receiver} |
| `GET` | `/internal/account` | get account information, only system can do this |
| `POST` | `/internal/balance` | update users balance, only system can do this |

---

## 📂 Project Structure
```bash
.
├── .github/workflows   # CI/CD Pipelines (YAML)
├── monitoring          # Prometheus & Grafana Config
├── scripts             # Bash scripts for deployment & testing
├── services            # Microservices Source Code
│   ├── account-service
│   ├── api-gateway
│   ├── auth-service
│   └── user-service
└── docker-compose.yml  # Orchestration Config
```

---

## 🧠 Future Improvement
1. Fix transactions service
2. Create custom matrics to visualize in Grafana
3. Implement blue-green deployment
