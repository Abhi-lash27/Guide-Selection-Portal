import prisma from "../db.js"
import logger from "../modules/logger.js";

export const registerProject = async (req, res) => {

    try {
        const {students} = req.body;

        const foundStudents = (await Promise.allSettled(students.map(async student =>
            prisma.student.findFirst({
                where: {
                    id: student.id
                }
            })))).map(result => result.value);

        if (foundStudents.length !== students.length) {
            return res.status(404).json({error: "Student(s) not found"})
        }

        logger.info(foundStudents, "Students")

        const project = await prisma.project.create({
            data: req.body
        })

        return res.json(200).json({project})
    } catch (err) {
        logger.error(err)
        return res.status(500).json({error: err.name})
    }
}