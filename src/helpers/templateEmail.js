export const templateCodeVerification = (nameFromEmail, code, role) => {
  const roleContent = {
    Consultant: {
      header: `
      <p style="margin: 0; margin-bottom: 16px;"><strong>¡${nameFromEmail} </strong>hemos creado tu perfil, ya formas parte de <strong><span style="color: #5e356f;">Consultor</span><span style="color: #f9a314;">-ES</span></strong>!</p>
      <p style="margin: 0; margin-bottom: 16px;">¡Queremos que <strong>tu talento</strong> esté vigente para aquellos emprendedores y empresarios que buscan <strong>alcanzar el éxito!</strong></p>
      <p style="margin: 0;">A continuación, puedes encontrar tu<strong>&nbsp;código&nbsp;de verificación</strong> de datos, el cual estará disponible por <strong>24 horas </strong>para habilitar tu perfil.</p>
      `,
      footer: `<p style="margin: 0; margin-bottom: 16px;">En caso de no continuar tu registro dentro del plazo indicado,&nbsp;<strong>deberás solicitar un nuevo código de&nbsp;</strong><strong>verificación</strong>&nbsp;para recibir un enlace de confirmación nuevo. ¡Gracias por seguir vigente y compartir tu experiencia!</p>
      <p style="margin: 0;"><strong>¡Bienvenido!</strong></p>`,
    },
    Client: {
      header: `
      <p style="margin: 0; margin-bottom: 16px;">¡Hola ${nameFromEmail}, <strong>Bienvenid@!</strong></p>
      <p style="margin: 0; margin-bottom: 16px;">Como parte de la seguridad que queremos ofrecerte, te solicitamos <strong>verificar tu correo electrónico</strong>, lo que nos permitirá corroborar que eres tú quien realiza tu registro.</p>
      <p style="margin: 0;">A continuación, puedes encontrar tu<strong>&nbsp;código&nbsp;de verificación</strong> de datos, el cual estará disponible por <strong>24 horas </strong>para habilitar tu perfil.</p>
      `,
      footer: `<p style="margin: 0; margin-bottom: 16px;">Estamos seguros que de la mano de,&nbsp;<strong>nuestro talento&nbsp;</strong><strong>senior,</strong> podrás alcanzar el <strong>éxito.</strong></p>
      <p style="margin: 0;">En una sociedad en la que estamos llenos de cambios, prevenir errores es tener ventaja. <strong>¡Gracias por confiar nuestros doctores empresariales!</strong></p>`,
    },
  };

  return `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
    
        .image_block img+div {
          display: none;
        }
    
        @media (max-width:720px) {
          .desktop_hide table.icons-inner {
            display: inline-block !important;
          }
    
          .icons-inner {
            text-align: center;
          }
    
          .icons-inner td {
            margin: 0 auto;
          }
    
          .image_block img.fullWidth {
            max-width: 100% !important;
          }
    
          .mobile_hide {
            display: none;
          }
    
          .row-content {
            width: 100% !important;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
    
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0px;
          }
    
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
    
          .row-1 .column-1 .block-2.paragraph_block td.pad>div,
          .row-1 .column-1 .block-6.paragraph_block td.pad>div {
            font-size: 14px !important;
          }
    
          .row-1 .column-1 .block-4.button_block a,
          .row-1 .column-1 .block-4.button_block div,
          .row-1 .column-1 .block-4.button_block span {
            font-size: 16px !important;
            line-height: 28px !important;
          }
        }
      </style>
    </head>
    
    <body style="margin: 0; background-color: #fff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;">
        <tbody>
          <tr>
            <td>
              <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                <tbody>
                  <tr>
                    <td>
                      <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff !important; color: #000; width: 700.00px; margin: 0 auto;" width="700.00">
                        <tbody>
                          <tr>
                            <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                              <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                    <div class="alignment" align="center" style="line-height:10px"><img class="fullWidth" src="cid:EmailHeader" style="display: block; height: auto; border: 0; max-width: 698px; width: 100%;" width="698"></div>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="color:#000000;direction:ltr;font-family:'Source Sans Pro', Tahoma, Verdana, Segoe, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:24px;">
                                    ${roleContent[role].header}
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="divider_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="button_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:50px;width:177px;v-text-anchor:middle;" arcsize="0%" stroke="false" fillcolor="#5e356f"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:20px"><![endif]-->
                                      <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#5e356f;border-radius:0px;width:auto;border-top:0px solid transparent;font-weight:700;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Source Sans Pro', Tahoma, Verdana, Segoe, sans-serif;font-size:20px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:20px;display:inline-block;letter-spacing:10px;"><span style="word-break: break-word; line-height: 40px;">&nbsp;${code}</span></span></div><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="divider_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                <tr>
                                  <td class="pad">
                                    <div style="color:#000000;direction:ltr;font-family:'Source Sans Pro', Tahoma, Verdana, Segoe, sans-serif;font-size:20px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:24px;">
                                    ${roleContent[role].footer}
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table class="image_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                    <div class="alignment" align="center" style="line-height:10px"><img class="fullWidth" src="cid:EmailFooter" style="display: block; height: auto; border: 0; max-width: 698px; width: 100%;" width="698"></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><!-- End -->
    </body>
    
    </html>
    `;
};
