// netlify/functions/registro.js
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }
  
  // Procesamos los datos enviados desde el formulario
  const { nombre, email, telefono, motivo } = JSON.parse(event.body);
  
  // Configuración de nodemailer
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,   // Configura en Netlify (más adelante)
      pass: process.env.EMAIL_PASS
    }
  });
  
  let mailOptions = {
    from: '"De Jóvenes a Jóvenes" <no-reply@tudominio.com>',
    to: 'dejovenesajovenescontacto@gmail.com',   // Cambia por tu correo real o el que quieras usar
    subject: `Nuevo registro de ${nombre}`,
    text: `Se registró con los siguientes datos:\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nMotivo: ${motivo}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Correo enviado exitosamente' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Error al enviar el correo', error: error.toString() })
    };
  }
};

