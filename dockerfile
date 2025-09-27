FROM node:20-alpine3.21 as base
RUN apk update \
	&& apk add --no-cache openssl\
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/cache/apk/*

ARG DATABASE_URL='file:/app/dev.db'
ARG HOST_URL='http://short-url.local'

ENV HOST_URL ${HOST_URL}
ENV DATABASE_URL ${DATABASE_URL}

FROM base as builder
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@9.4.0 --activate

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

COPY . ./

RUN pnpm prisma generate && \
    pnpm prisma migrate dev

RUN pnpm run build

FROM base as runner
ENV HOST 0.0.0.0
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/dev.db /app/dev.db

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
