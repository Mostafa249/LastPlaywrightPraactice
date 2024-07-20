import fs from 'fs';
import xlsx from 'xlsx';

export class DataReader {
    static readJsonFile(filePath) {
        const rawData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(rawData);
    }
    static readExcelFile(filePath, sheetName) {
        const workbook = xlsx.readFile(filePath);
        const selectedSheetName = sheetName || workbook.SheetNames[0];
        const sheet = workbook.Sheets[selectedSheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        return data;
    }
}


