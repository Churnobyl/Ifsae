# Stage 1: 빌드
FROM node:20.15.0-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN mkdir -p node_modules/react-full-page/lib && \
    echo 'declare module "react-full-page" { type ControlComponentsProps = { getCurrentSlideIndex: () => number; onNext: () => void; onPrev: () => void; scrollToSlide: (n: number) => void; slidesCount: number; children: React.ReactNode; }; type FullPageProps = { initialSlide?: number; duration?: number; controls?: boolean | React.FC<ControlComponentsProps>; controlProps?: any; beforeChange?: () => void; afterChange?: () => void; scrollMode?: "full-page" | "normal"; children: React.ReactNode; }; type SlideProps = { children: React.ReactNode; style?: { maxHeight: string }; }; export const FullPage: React.FC<FullPageProps>; export const Slide: React.FC<SlideProps>; }' > node_modules/react-full-page/lib/index.d.ts

RUN yarn build

# Stage 2: Dist 배포
FROM node:20.15.0-alpine

RUN yarn global add serve
WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/env.sh ./env.sh

RUN chmod +x ./env.sh

EXPOSE 3000
CMD ["sh", "-c", "./env.sh && serve -s dist -l 3000"]
