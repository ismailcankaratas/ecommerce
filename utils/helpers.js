export function dateConvert(date) {
    var simdi = new Date();
    var tarih = new Date(date);
    var gecen = new Date(simdi - tarih);

    var saniye = Math.floor((simdi - tarih) / 1000);
    var dakika = Math.floor(saniye / 60);
    var saat = Math.floor(dakika / 60);
    var gunler = Math.floor(saat / 24);

    if (gunler > 0) {
        return `${gunler} gün önce`;
    }
    if (saat > 0) {
        return `${saat} saat önce`;
    }
    if (dakika > 0) {
        return `${dakika} dakika önce`;
    }
    if (saniye == 0) {
        return `Şimdi`;
    }
    return `${saniye} saniye önce`;
}

export function convertDocToObj(doc) {
    doc.id = doc.id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    return doc;
}
export function convertDocToJson(doc) {
    return JSON.parse(JSON.stringify(doc));
}