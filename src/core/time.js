function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  
exports.formatDate = (unix) => {
    const date = new Date(unix);
  
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
  
    return toTitleCase(date.toLocaleString('es-ES', options)).replace(',', '');
};  