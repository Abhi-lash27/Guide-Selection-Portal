import prisma from "../db.js";
import logger from "../modules/logger.js";

export const uploadFile = async (req, res, next) => {
  logger.info(req.body);
  try {
    const file = await prisma.file.create({
      data: {
        type: req.body.type,
        data: req.file.buffer
      }
    });
    logger.info("file inserted", file);
    return res.status(200).json({ id: file.id});
  } catch (e) {
    logger.error(e);
    res.status(400).json({ error: "Bad request" });
  }
};

const getContentType = (fileType) => {
  switch (fileType) {
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "pdf":
      return "application/pdf";
  }
};

export const getFileById = async (req, res) => {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.writeHead(200, { "Content-Type": getContentType(file.type) });
    res.end(file.data, "binary");
  } catch (e) {
    logger.error(e);
    return res.status(400).json({ error: "Bad request" });
  }
};

export const updateFile = async (req, res) => {
  try {
    const file = await prisma.file.update({
      where: {
        id: req.params.id
      },
      data: {
        type: req.body.type,
        data: req.file.buffer
      }
    });

    return res.status(200).json({ file });
  } catch (e) {
    logger.error(e);
    return res.status(400).json({ error: "Bad request" });
  }
};

