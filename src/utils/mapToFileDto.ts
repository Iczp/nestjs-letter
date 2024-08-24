import { FileDto } from '../dtos/FileDto';

/**
 * 将文件对象映射到 FileDto 实例
 * @param file 文件对象，通常来自文件上传处理
 * @returns 转换后的 FileDto 实例
 */
export function mapToFileDto(file: Express.Multer.File): FileDto {
  return {
    fieldname: file.fieldname,
    originalname: file.originalname,
    encoding: file.encoding, // 注意：这个字段可能已经被废弃
    mimetype: file.mimetype,
    size: file.size,
    // 对于 DiskStorage 特有的属性，你可能需要根据实际情况决定是否包含它们
    // 或者你可能需要额外的逻辑来确定这些值是否应该被包含
    // 例如，如果文件不是通过 DiskStorage 存储的，这些字段可能不存在
    destination: file.destination || '', // 如果不是 DiskStorage，则默认为空字符串
    filename: file.filename || '', // 同上
    path: file.path || '', // 同上
  };
}
