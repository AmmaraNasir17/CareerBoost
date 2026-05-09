const PDFDocument = require("pdfkit");

const generateResumePDF = (resumeData, res) => {
  const { personal_info, education, experience, projects, skills } = resumeData;

  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${personal_info?.name || "resume"}.pdf"`
  );

  doc.pipe(res);

  const addSectionTitle = (title) => {
    doc
      .moveDown(0.5)
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(title.toUpperCase())
      .moveDown(0.2)
      .moveTo(doc.x, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(0.4)
      .font("Helvetica")
      .fontSize(11);
  };

  if (personal_info) {
    doc.fontSize(20).font("Helvetica-Bold").text(personal_info.name || "", { align: "center" });
    doc.fontSize(10).font("Helvetica");
    const contactParts = [personal_info.email, personal_info.phone, personal_info.location].filter(Boolean);
    doc.text(contactParts.join("  |  "), { align: "center" });
    if (personal_info.linkedin) doc.text(personal_info.linkedin, { align: "center" });
    doc.moveDown(0.5);
  }

  if (experience && experience.length > 0) {
    addSectionTitle("Experience");
    experience.forEach((exp) => {
      doc.font("Helvetica-Bold").text(exp.title || "");
      doc.font("Helvetica").text(`${exp.company || ""}  |  ${exp.duration || ""}`);
      if (exp.description) doc.text(exp.description);
      doc.moveDown(0.4);
    });
  }

  if (education && education.length > 0) {
    addSectionTitle("Education");
    education.forEach((edu) => {
      doc.font("Helvetica-Bold").text(edu.degree || "");
      doc.font("Helvetica").text(`${edu.institution || ""}  |  ${edu.year || ""}`);
      doc.moveDown(0.4);
    });
  }

  if (projects && projects.length > 0) {
    addSectionTitle("Projects");
    projects.forEach((proj) => {
      doc.font("Helvetica-Bold").text(proj.name || "");
      doc.font("Helvetica");
      if (proj.description) doc.text(proj.description);
      if (proj.tech) doc.text(`Tech: ${proj.tech}`);
      doc.moveDown(0.4);
    });
  }

  if (skills && skills.length > 0) {
    addSectionTitle("Skills");
    doc.font("Helvetica").text(skills.join(", "));
  }

  doc.end();
};

module.exports = { generateResumePDF };