
# Crappier: A poor Zapier

A Zapier-like project that automates Solana transactions. Built using Next.js (frontend and backend) and a Node.js worker that retrieves running jobs from Kafka. Transactions employ SOL stored in a PDA pot. If the transfer exceeds the pot balance, customers will receive an email asking them to refill. Scalable with Kubernetes and Docker.


## For NEXTJS APP (frontend):

Contains the backend and frontend.

Uses [React-flow](https://reactflow.dev) for Zap create page 

```bash
cd frontend && npm run dev
```

#### Environment Variables


`AUTH_SECRET`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`DATABASE_URL`
`COMMUNICATION_SERVICES_CONNECTION_STRING`
`NEXTAUTH_URL`
`NEXT_PUBLIC_URL`
`NEXT_PUBLIC_WORKER`


## For Worker:

Pulls the active zaps from a kafka queue.
```bash
cd worker && docker compose up --build
```

#### Environment Variables

`DATABASE_URL`
`COMMUNICATION_SERVICES_CONNECTION_STRING`
`ANCHOR_PRIVATE_KEY`

---
### Demo

![Watch demo](https://github.com/user-attachments/assets/d86e4a54-519e-4cd5-a88d-1694875a4234
)
