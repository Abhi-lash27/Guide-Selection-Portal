import prisma from "../db.js"
import logger from "../modules/logger.js";

const MAX_STUDENTS_IN_PROJECT = 2;

export const registerProject = async (req, res) => {

    try {
        const {studentIds} = req.body;

        if(studentIds.length > MAX_STUDENTS_IN_PROJECT) {
            return  res.status(400).json({ error: `Only ${MAX_STUDENTS_IN_PROJECT} are allowed per project`});
        }

        const foundStudents = (await Promise.allSettled(studentIds.map(async id =>
            prisma.student.findFirst({
                where: {
                    id
                }
            }))));

        logger.debug(foundStudents, "Found students from DB");

        if (foundStudents.length !== studentIds.length) {
            return res.status(404).json({error: "Student(s) not found"})
        }

        const project = await prisma.project.create({
            data: {
                title: req.body.title,
                students: {
                    connect: studentIds.map(id => ({ id }))
                },
                staff: {
                    connect: { id: "657bed4edd52b78d51e60d8d"}
                }
            }
        })

        res.status(200).json({project})
    } catch (err) {
        logger.error(err)
        res.status(500).json({error: err.name})
    }
}