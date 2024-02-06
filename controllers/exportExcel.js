const ExcelJS = require('exceljs');
const path = require('path');
const userTable = require('../models/userModel');
const sequelize = require('../config/db');

const exportToExcel = async (req, res) => {

  const filePath = path.join(__dirname, '../assets', req.body.fileName);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const userData = await userTable.UserDetails.findAll({
      attributes: ['user_id', 'first_Name', 'last_Name', 'age', 'email'],
      include: [{ model: userTable.UserCountry, attributes: ['country','country_id'] }],
    });

    worksheet.addRow(['User ID', 'First Name', 'Last Name', 'Age', 'Email', 'Country','country_id']);

    userData.forEach((user) => {
      worksheet.addRow([
        user.user_id,
        user.first_Name,
        user.last_Name,
        user.age,
        user.email,
        user.usercountry ? user.usercountry.country : '', 
        user.usercountry ? user.usercountry.country_id : '', 
      ]);
    });

    await workbook.xlsx.writeFile(filePath);

    console.log('Data exported to Excel successfully');
    res.status(201).json("Data exported to Excel successfully");
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { exportToExcel };
