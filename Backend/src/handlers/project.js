import prisma from "../db.js";
import logger from "../modules/logger.js";

const MAX_STUDENTS_IN_PROJECT = 2;
const MAX_PROJECT_COUNT = 5

// export const registerProject = async (req, res) => {
//   try {
//     const { studentIds } = req.body;
//
//     if (studentIds.length > MAX_STUDENTS_IN_PROJECT) {
//       return res
//         .status(400)
//         .json({
//           error: `Only ${MAX_STUDENTS_IN_PROJECT} are allowed per project`,
//         });
//     }
//
//     const existingProjectCount = await prisma.project.count({
//       where: {
//         staffId: req.body.id
//       }
//     })
//
//     if(!existingProjectCount >= MAX_PROJECT_COUNT ) {
//       return res.status(400).json({
//         error: `Teacher has already reached the maximum limit of 5 projects.`,
//       });
//     }
//
//     const foundStudents = await Promise.allSettled(
//       studentIds.map(async (id) =>
//         prisma.student.findFirst({
//           where: {
//             id,
//           },
//         }),
//       ),
//     );
//
//     logger.debug(foundStudents, "Found students from DB");
//
//     if (foundStudents.length !== studentIds.length) {
//       return res.status(404).json({ error: "Student(s) not found" });
//     }
//
//     const staffId = await prisma.staff.findFirst({
//       where: {
//         id: req.body.id,
//       },
//     });
//
//     const project = await prisma.project.create({
//       data: {
//         title: req.body.title,
//         students: {
//           connect: studentIds.map((id) => ({ id })),
//         },
//         staff: {
//           connect: staffId,
//         },
//       },
//     });
//
//     res.status(200).json({ project });
//   } catch (err) {
//     logger.error(err);
//     res.status(500).json({ error: err.name });
//   }
// };

export const registerProject = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const staffId = req.body.id;

    // Check if the teacher already has 5 projects
    const existingProjectsCount = await prisma.project.count({
      where: {
        staffId,
      },
    });

    if (existingProjectsCount >= 5) {
      return res.status(400).json({
        error: `Teacher has already reached the maximum limit of 5 projects.`,
      });
    }

    if (studentIds.length > MAX_STUDENTS_IN_PROJECT) {
      return res.status(400).json({
        error: `Only ${MAX_STUDENTS_IN_PROJECT} students are allowed per project`,
      });
    }

    const foundStudents = await Promise.allSettled(
      studentIds.map(async (id) =>
        prisma.student.findFirst({
          where: {
            id,
          },
        }),
      ),
    );

    logger.debug(foundStudents, "Found students from DB");

    if (foundStudents.length !== studentIds.length) {
      return res.status(404).json({ error: "Student(s) not found" });
    }

    const staff = await prisma.staff.findFirst({
      where: {
        id: staffId,
      },
    });

    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    const project = await prisma.project.create({
      data: {
        title: req.body.title,
        students: {
          connect: studentIds.map((id) => ({ id })),
        },
        staff: {
          connect: {
            id: staffId,
          },
        },
      },
    });

    res.status(200).json({ project });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: err.name });
  }
};


export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    return res.status(200).json({ projects });
  } catch (err) {
    logger.error(err);
    return res.status(404).json({ error: "Projects not found" });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        students: {
          select: {
            fullName: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (err) {
    logger.error(err);
    return res.status(404).json({ error: "Project not found" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updateProject = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    return res.status(200).json(updateProject);
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ error: "Bad request" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProject)
      return res.status(404).json({ error: "Project not found" });

    return res.status(200).json("Project deleted successfully");
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ error: "Bad request" });
  }
};
