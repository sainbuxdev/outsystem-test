const { PrismaClient } = require("@prisma/client");
const XLSX = require("xlsx");
const prisma = new PrismaClient();

async function importDataFromExcel() {
  const workbook = XLSX.readFile("Products.xlsx");
  const sheetNameList = workbook.SheetNames;
  const items = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

  // Insert each item into the database
  for (const item of items) {
    await prisma.item.create({
      data: {
        name: item.Name,
        price: parseInt(item.Price, 10),
        weight: parseInt(item.Weight, 10),
      },
    });
  }

  console.log("Data imported successfully!");
}

importDataFromExcel()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
