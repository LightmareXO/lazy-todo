ARG GO_VERSION=1.26.3

FROM golang:${GO_VERSION}-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /out/lazy-todo-backend .

FROM alpine:3.22

RUN adduser -D -H appuser

WORKDIR /app
COPY --from=build /out/lazy-todo-backend /app/lazy-todo-backend

USER appuser

EXPOSE 8080
CMD ["/app/lazy-todo-backend"]

