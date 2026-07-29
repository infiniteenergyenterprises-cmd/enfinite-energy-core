'use client';
// @ts-ignore
import jsPDF from 'jspdf';

export interface BrochureData {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  pages: string;
  size: string;
  tags: string[];
  sections: { heading: string; points: string[] }[];
  specs?: { label: string; value: string }[];
}

const BRAND_DARK = [11, 30, 61] as [number, number, number];   // #0B1E3D
const BRAND_AMBER = [245, 166, 35] as [number, number, number]; // #F5A623
const GRAY = [100, 100, 100] as [number, number, number];
const LIGHT = [248, 250, 252] as [number, number, number];

function addPageBackground(doc: jsPDF) {
  doc.setFillColor(...LIGHT);
  doc.rect(0, 0, 210, 297, 'F');
}

function addHeader(doc: jsPDF, brochure: BrochureData) {
  // Dark top bar
  doc.setFillColor(...BRAND_DARK);
  doc.rect(0, 0, 210, 48, 'F');

  // Amber accent strip
  doc.setFillColor(...BRAND_AMBER);
  doc.rect(0, 48, 210, 3, 'F');

  // Company name
  doc.setTextColor(245, 166, 35);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ENFINITE ENERGY PVT. LTD.', 14, 14);

  // MNRE badge text
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('MNRE APPROVED  |  ISO CERTIFIED  |  500+ PROJECTS', 14, 21);

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(brochure.title, 14, 36);

  // Subtitle
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text(brochure.subtitle, 14, 44);

  // Right side: page count + date
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  doc.text(`Issued: ${today}`, 196, 14, { align: 'right' });
  doc.text(brochure.pages, 196, 21, { align: 'right' });
}

function addFooter(doc: jsPDF, pageNum: number) {
  const pageH = 297;
  doc.setFillColor(...BRAND_DARK);
  doc.rect(0, pageH - 14, 210, 14, 'F');
  doc.setFillColor(...BRAND_AMBER);
  doc.rect(0, pageH - 14, 210, 1, 'F');

  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Enfinite Energy Pvt. Ltd.  |  enfiniteenergy.com  |  +91 74800 18007', 14, pageH - 5);
  doc.text(`Page ${pageNum}`, 196, pageH - 5, { align: 'right' });
}

function addSection(doc: jsPDF, section: { heading: string; points: string[] }, y: number): number {
  // Section heading bar
  doc.setFillColor(235, 240, 250);
  doc.roundedRect(14, y, 182, 9, 2, 2, 'F');
  doc.setFillColor(...BRAND_AMBER);
  doc.roundedRect(14, y, 4, 9, 1, 1, 'F');

  doc.setTextColor(...BRAND_DARK);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(section.heading, 22, y + 6.5);
  y += 14;

  // Bullet points
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);

  for (const point of section.points) {
    const lines = doc.splitTextToSize(`• ${point}`, 172);
    doc.text(lines, 18, y);
    y += lines.length * 5 + 2;
  }
  return y + 4;
}

function addSpecsTable(doc: jsPDF, specs: { label: string; value: string }[], y: number): number {
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...BRAND_DARK);
  doc.text('Key Specifications', 14, y);
  y += 6;

  specs.forEach((spec, i) => {
    const rowBg = i % 2 === 0 ? [255, 255, 255] : [240, 244, 251];
    doc.setFillColor(rowBg[0], rowBg[1], rowBg[2]);
    doc.roundedRect(14, y, 182, 8, 1, 1, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...BRAND_DARK);
    doc.text(spec.label, 18, y + 5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    doc.text(spec.value, 120, y + 5.5);
    y += 9;
  });
  return y + 6;
}

function addContactBox(doc: jsPDF, y: number) {
  doc.setFillColor(...BRAND_DARK);
  doc.roundedRect(14, y, 182, 38, 4, 4, 'F');
  doc.setFillColor(...BRAND_AMBER);
  doc.roundedRect(14, y, 182, 1, 0, 0, 'F');

  doc.setTextColor(245, 166, 35);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Get in Touch with Our Solar Experts', 20, y + 10);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Phone / WhatsApp: +91 74800 18007', 20, y + 18);
  doc.text('Email: info@enfiniteenergy.com', 20, y + 25);
  doc.text('Website: www.enfiniteenergy.com', 20, y + 32);
}

export async function generateBrochurePDF(brochure: BrochureData): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // ── Page 1 ──────────────────────────────────────────
  addPageBackground(doc);
  addHeader(doc, brochure);

  let y = 60;

  // Overview
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(14, y, 182, 28, 3, 3, 'F');
  doc.setDrawColor(230, 235, 245);
  doc.roundedRect(14, y, 182, 28, 3, 3, 'S');

  doc.setTextColor(...BRAND_DARK);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('OVERVIEW', 20, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...GRAY);
  doc.setFontSize(8.5);
  const descLines = doc.splitTextToSize(brochure.desc, 170);
  doc.text(descLines, 20, y + 15);
  y += 36;

  // Tags
  let tagX = 14;
  brochure.tags.forEach(tag => {
    const w = doc.getStringUnitWidth(tag) * 8.5 / doc.internal.scaleFactor + 8;
    doc.setFillColor(245, 166, 35, 0.15);
    doc.setFillColor(255, 248, 230);
    doc.roundedRect(tagX, y, w, 7, 2, 2, 'F');
    doc.setTextColor(180, 110, 0);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(tag, tagX + 4, y + 5);
    tagX += w + 3;
  });
  y += 14;

  // Sections
  for (const section of brochure.sections) {
    if (y > 235) {
      addFooter(doc, 1);
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, brochure);
      y = 60;
    }
    y = addSection(doc, section, y);
  }

  // Specs table
  if (brochure.specs && brochure.specs.length > 0) {
    if (y > 200) {
      addFooter(doc, 1);
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, brochure);
      y = 60;
    }
    y = addSpecsTable(doc, brochure.specs, y);
  }

  // Contact box
  if (y > 230) {
    addFooter(doc, doc.getNumberOfPages());
    doc.addPage();
    addPageBackground(doc);
    addHeader(doc, brochure);
    y = 60;
  }
  addContactBox(doc, y + 4);

  addFooter(doc, doc.getNumberOfPages());

  // Save
  const fileName = `Enfinite-Energy-${brochure.title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
  doc.save(fileName);
}
