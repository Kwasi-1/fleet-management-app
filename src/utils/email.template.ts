export const EMAIL_TEMPLATE = (logoUrl: any, title: any, plans: any[], paymentLink: any, ourCompanyName: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: left;
        }
        .header img {
            max-width: 150px;
        }
        .title {
            font-size: 24px;
            margin-top: 20px;
            text-align: center;
        }
        .icon {
            text-align: center;
            margin-top: 10px;
        }
        .icon img {
            max-width: 100px;
        }
        .content {
            font-size: 14px;
            line-height: 1.6;
            margin-top: 20px;
        }
        .content p {
            margin: 0 0 10px;
        }
        .highlight {
            color: #007bff;
        }
        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 4px;
        }
        .plan {
            margin-bottom: 20px;
        }
        .plan-name {
            font-weight: bold;
            margin-top: 10px;
        }
        .plan-detail {
            margin-left: 20px;
        }
        .footer {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="${logoUrl}" alt="${ourCompanyName} Logo">
        </div>
        <div class="title">${title}</div>
        <div class="content">
            <p>Hi,</p>
            <p>It's not too late to keep the work you've done so far! This is your last chance to add payment details before your subscription is deactivated. At that point, you'll lose product access, but your data will be retained securely.</p>
            ${plans.map(plan => `
                <div class="plan">
                    <div class="plan-name">Plan: ${plan.planName}</div>
                    <div class="plan-detail">Due Date: ${plan.dueDate}</div>
                    <div class="plan-detail">Amount: ${plan.planCurrency} ${plan.planAmount}</div>
                </div>
            `).join('')}
            <p>Your total estimated bill is <span class="highlight">${plans.reduce((total, plan) => total + parseFloat(plan.planAmount), 0).toFixed(2)} ${plans[0].planCurrency}</span> (excludes tax).</p>
            <a href="${paymentLink}" class="cta-button">Add payment details</a>
            <p>Once you add payment details, we'll process payment from the start of your billing cycle.</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} ${ourCompanyName}. All rights reserved.
        </div>
    </div>
</body>
</html>`;
