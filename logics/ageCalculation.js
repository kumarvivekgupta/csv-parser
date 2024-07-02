import db from '../database.js';

async function getAgeGroupDistribution() {
  try {
    const [rows] = await db.query(`
      SELECT 
        SUM(CASE WHEN age < 20 THEN 1 ELSE 0 END) AS '< 20',
        SUM(CASE WHEN age BETWEEN 20 AND 40 THEN 1 ELSE 0 END) AS '20 to 40',
        SUM(CASE WHEN age BETWEEN 40 AND 60 THEN 1 ELSE 0 END) AS '40 to 60',
        SUM(CASE WHEN age > 60 THEN 1 ELSE 0 END) AS '> 60'
      FROM new_table
    `);

    return rows[0];
  } catch (error) {
    console.error('Error querying age group distribution:', error);
    throw error;
  }
}
async function printAgeGroupDistribution() {
    try {
      const ageGroups = await getAgeGroupDistribution();
  
      const total = Object.values(ageGroups).reduce((acc, count) => acc + count, 0);
      if (total === 0) {
        console.log('No users found in the database.');
        return;
      }
  
      console.log('Age-Group % Distribution');
      for (const [ageGroup, count] of Object.entries(ageGroups)) {
        const percentage = ((count / total) * 100).toFixed(2);
        console.log(`${ageGroup} ${percentage}`);
      }
    } catch (error) {
      console.error('Error printing age group distribution:', error);
    }
}
export default printAgeGroupDistribution;