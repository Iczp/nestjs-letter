/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const packageJson = require('../package.json');
const version = packageJson.version;

// 读取 docker-compose.yml 文件
const dockerComposePath = path.resolve(__dirname, '../docker-compose.yml');
const dockerComposeFile = fs.readFileSync(dockerComposePath, 'utf8');

console.log(`dockerComposeFile`, dockerComposeFile);

const dockerCompose = yaml.load(dockerComposeFile);

// 假设你要更新的服务名为 'myservice'
const serviceName = 'nest-letter';

console.log(`Updating image version for service '${serviceName}'...`);

// 检查服务是否存在并更新镜像版本号
if (dockerCompose.services && dockerCompose.services[serviceName]) {
  dockerCompose.services[serviceName].image = `iczpnet/letter-nest:v${version}`;
} else {
  throw new Error(`Service '${serviceName}' not found in docker-compose.yml`);
}

// 保存更改回文件
fs.writeFileSync(dockerComposePath, yaml.stringify(dockerCompose));
