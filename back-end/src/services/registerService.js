const sql = require("mssql");
const sqlConfig = require("../config/database");

const getRegisterInformation = async (email, password, fullname, birthday) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .input("FullName", sql.NVarChar, fullname)
      .input("Birthday", sql.Date, birthday)
      .query(`INSERT INTO                     
                    Users(FullName, Email, Password, Birthday)
                    VALUES(@FullName, @Email, @Password, @Birthday)`);

    return { success: true };
  } catch (err) {
    if (err.number === 2627) { // Unique constraint error number
      console.log("Duplicate email error:", err.message);
      return { success: false, error: "Email already exists" };
    }
    console.log("Database error:", err.message);
    return { success: false, error: "Database error" };
  }
};

module.exports = {
  getRegisterInformation,
};
