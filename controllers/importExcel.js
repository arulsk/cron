
const ExcelJS = require('exceljs');
const path = require('path');
const userTable = require('../models/userModel')
const sequelize = require('../config/db');
const filePath = path.join(__dirname,'../assets/output.xlsx')

const readExcel = async (req,res) => {
  const workbook = new ExcelJS.Workbook();

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);

    await sequelize.sync()

    worksheet.eachRow({ includeEmpty: false, skipHeader: true, from: 2 }, async (row, rowNumber) => {
      const rowData = row.values;

      try {
        const userDetails = await userTable.UserDetails.create({
          user_id: rowData[1],
          first_Name: rowData[2],
          last_Name: rowData[3],
          age: rowData[4],
          email: rowData[5],
        });

        await userTable.UserCountry.create({
          user_id: userDetails.user_id,
          country: rowData[6], 
        });
         res.status(201).json("file import sucessful")
      } catch (error) {
        console.error(`Error inserting row: ${error.message}`);
      }
    });

    console.log('Data successfully inserted into userDetails and user_country tables');
  } catch (error) {
    console.error('Error:', error.message);
  } 
};

module.exports = {readExcel}