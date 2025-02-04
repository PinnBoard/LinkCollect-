export function weeklyEmail(name: string): string {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
       
    </head>
    
    <body style="font-family: 'open sans', sans-serif;">
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
            <tr>
                <td style="background: #FFF;">
                    <table role="presentation" cellspacing="0" cellpadding="0" width="640" align="center">
                        <tr>
                            <td style="padding: 0; text-align: center;">
                              
    
                                <!-- verification content -->
                            
                                <p
                                    style="color: #000; text-align: justify; font-size: 12px; font-weight: 500; line-height: 1.5; margin: 20px 0;"> Hey ${name},
                                    <br> <br> 
                                    I've got some super-duper exciting news, and I couldn't wait to personally drop it in your inbox! 🎉 <br>
    
                                    But first, let's chat - how's your LinkCollect journey been so far? 😊. Should you have any questions, concerns, or suggestions, please don't hesitate to reply to this email.
                                    <br> <br> 
    
                                    Now, I'm thrilled to announce some exciting new features we've recently launched:
                                    <br> <br> 
    
    
                                    <b>Pin and Unpin Links and Collections</b>: You can now easily organize your links and collections by pinning or unpinning them for quick access.
                                    <br> <br> 
                                    <!-- <br> <br>  -->
    
    
                                    <b>Explore and Search Feature</b>: Discover a world of possibilities within LinkCollect. Explore other users' collections and find inspiration for your own. The powerful search feature lets you find collections and links effortlessly.
                                    <br> <br> 
                                    <!-- <br> <br>  -->
    
    
                                    <b>Responsive Mobile Browser Support</b>: We've optimized LinkCollect for mobile browsers, ensuring a seamless experience on your smartphones and tablets. You can now access your favorite links and collections on the go.
                                    <br> <br> 
                                    <!-- <br> <br>  -->
    
    
                                    We believe these enhancements will elevate your LinkCollect experience to new heights, making it even more convenient and enjoyable.
                                    <br> <br> 
    
    
                                    I invite you to log in to your LinkCollect dashboard and explore these new features. Don't hesitate to reach out if you encounter any questions or need assistance with anything.
                                    <br> <br> 
    
    
                                    Lastly, an image of our dark mode explore page to tease you, how does it look ? 😌
    
                                    <div style="max-width: 100%; overflow: hidden;">
                                        <img src="https://cdn.discordapp.com/attachments/1114891650758623302/1149263235577544794/image.png" alt="Dark Mode LinkCollect Dashboard Image" style="width: 100%; height: auto;">
                                    </div>
    
    
                                   </p>
    
                       
    
                            </td>
                        </tr>
                      
                            <td style="background: #FFF; text-align: center; padding: 20px 0; display: flex;">
                                <!-- sign-off message -->
                                <p
                                    style="color: #000; font-size: 12px; font-weight: 500; text-align: left; white-space: nowrap; line-height: normal; align-self: center;">
                                    Cheers,<br /> Harsh, founder
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background: #6166F1; text-align: center; padding: 20px;">
    
                                <!-- icons -->
    
                                <div style="display: flex; justify-content: center;">
                                    <div
                                        style="display: flex; justify-content: center; margin: 10px auto; align-self: center;">
                                        <a href="https://twitter.com/linkcollect_io" style="margin-right: 10px;"><img
                                                src="https://i.ibb.co/FKnCFRV/twitter.png" alt="twitter" width="26"
                                                height="26" style="display: block;"></a>
                                        <a href="https://discord.com/invite/askwhy-1074020862489022514"><img src="https://i.ibb.co/ZNbGhBK/discord.png" title='discord'
                                                width="26" height="26" style="display: block;" /></a>
                                    </div>
                                </div>
                                <!-- footer -->
                                <div style="color: #FFF; font-size: 12px; font-weight: 500; line-height: 1.5;">
                                    <p style="margin: 0;">2023 @linkcollect.io</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    
    </html> `;
  }
  