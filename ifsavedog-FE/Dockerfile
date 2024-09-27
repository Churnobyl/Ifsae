FROM node:20.15.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .
EXPOSE 3000

RUN mkdir -p node_modules/react-full-page/lib && \
    echo 'declare module "react-full-page" {\
    type ControlComponentsProps = {\
    getCurrentSlideIndex: () => number;\
    onNext: () => void;\
    onPrev: () => void;\
    scrollToSlide: (n: number) => void;\
    slidesCount: number;\
    children: React.ReactNode;\
    };\
    type FullPageProps = {\
    initialSlide?: number;\
    duration?: number;\
    controls?: boolean | React.FC<ControlComponentsProps>;\
    controlProps?: any;\
    beforeChange?: () => void;\
    afterChange?: () => void;\
    scrollMode?: "full-page" | "normal";\
    children: React.ReactNode;\
    };\
    type SlideProps = {\
    children: React.ReactNode;\
    style?: { maxHeight: string };\
    };\
    export const FullPage: React.FC<FullPageProps>;\
    export const Slide: React.FC<SlideProps>;\
    }' > node_modules/react-full-page/lib/index.d.ts


RUN yarn build
RUN yarn global add serve


CMD ["serve", "-s", "dist", "-l", "3000"]