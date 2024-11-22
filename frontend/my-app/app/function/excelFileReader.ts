import * as xlsx from 'xlsx'

export default function excelFileReader(arrayBuffer: any) {

    const workbook = xlsx.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    return jsonData
}