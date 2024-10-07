# 第一阶段：构建环境
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 将package.json和package-lock.json复制到容器中
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY edgedb.toml ./
# 安装生产环境依赖
# 安装pnpm（如果官方Node.js镜像中不包含pnpm）
# 注意：Node.js的官方Alpine镜像可能不包含pnpm，
# 因此你可能需要从npm或yarn全局安装它
# 或者，更推荐的做法是在构建之前将pnpm作为devDependency添加到package.json中
# 然后使用RUN pnpm install --prod来安装依赖
# 但这里我们假设你需要手动安装pnpm
RUN npm install -g pnpm

# 使用pnpm安装项目依赖
# 注意：--frozen-lockfile 确保安装与pnpm-lock.yaml中完全相同的依赖版本
RUN pnpm install --frozen-lockfile 

#--production



# 将项目文件复制到容器中
COPY . .

# 这里我们增加了NODE_OPTIONS环境变量
ENV NODE_OPTIONS=--max_old_space_size=8192

# 编译NestJS项目
RUN pnpm build

# 第二阶段：运行环境
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# micromatch 包中存在的 Regular Expression Denial of Service (ReDoS) 漏洞问题
# RUN npm update micromatch

# 复制构建产物
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/edgedb.toml ./

RUN npm install -g pnpm

RUN pnpm install --production --frozen-lockfile

# COPY --from=builder /app/node_modules ./node_modules

# 暴露端口
EXPOSE 3000


CMD ["node", "dist/main.js"]

