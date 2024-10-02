import React, { useState } from 'react';
import { jsPDF } from 'jspdf';



export default function ROIcalculator() {
    // State variables
    const [totalEmployees, setTotalEmployees] = useState(100);
    const [softwareApps, setSoftwareApps] = useState(10);
    const [avgCostPerLicense, setAvgCostPerLicense] = useState(1000);
    const [newSoftwareCost, setNewSoftwareCost] = useState(50000);
    const [exEmployees, setExEmployees] = useState(20);
    const [avgOnboardingCost, setAvgOnboardingCost] = useState(5000);
    const [contractors, setContractors] = useState(15);
    const [contractorRate, setContractorRate] = useState(50);
    const [contractorHours, setContractorHours] = useState(40);
    const [employeeWage, setEmployeeWage] = useState(25);
    const [manualTaskReduction, setManualTaskReduction] = useState(20);
    const [itSupportStaff, setItSupportStaff] = useState(5);
    const [itTicketReduction, setItTicketReduction] = useState(30);
    const [currentServerCosts, setCurrentServerCosts] = useState(100000);
    const [newServerCosts, setNewServerCosts] = useState(80000);
    const [implementationCost, setImplementationCost] = useState(75000);
    


    const calculateResults = () => {
        const currentSoftwareCosts = softwareApps * avgCostPerLicense * totalEmployees; // Fixed calculation
        const softwareSavings = currentSoftwareCosts - newSoftwareCost;

        const currentOnboardingCosts = exEmployees * avgOnboardingCost;
        const newOnboardingCosts = exEmployees * (avgOnboardingCost * (1 - manualTaskReduction / 100));
        const onboardingSavings = currentOnboardingCosts - newOnboardingCosts;

        const currentContractorCosts = contractors * contractorRate * contractorHours * 52; // Annual cost
        const newContractorCosts = currentContractorCosts * (1 - manualTaskReduction / 100);
        const contractorSavings = currentContractorCosts - newContractorCosts;

        const currentItSupportCosts = itSupportStaff * employeeWage * 52 * 40; // Annual cost
        const newItSupportCosts = currentItSupportCosts * (1 - itTicketReduction / 100);
        const itSupportSavings = currentItSupportCosts - newItSupportCosts;

        const infrastructureSavings = currentServerCosts - newServerCosts;

        const totalAnnualSavings = softwareSavings + onboardingSavings + contractorSavings + itSupportSavings + infrastructureSavings;

        // Correct total costs
        const totalCosts = newSoftwareCost + implementationCost;

        // Fixing the 3-Year ROI calculation
        const threeYearROI = ((totalAnnualSavings * 3) - totalCosts).toFixed(2);

        // Correct payback period calculation
        const paybackPeriod = ((totalCosts / totalAnnualSavings) * 12).toFixed(2);

        return {
            totalAnnualSavings: totalAnnualSavings.toFixed(2),
            totalCosts: totalCosts.toFixed(2),
            threeYearROI,
            paybackPeriod,
        };
    };

    const { totalAnnualSavings, totalCosts, threeYearROI, paybackPeriod } = calculateResults();

    const downloadCSV = () => {
        const csvContent = `data:text/csv;charset=utf-8,Field,Value\n` +
            `Total Annual Savings,${totalAnnualSavings}\n` +
            `Total Costs,${totalCosts}\n` +
            `3-Year ROI,${threeYearROI}\n` +
            `Payback Period (Months),${paybackPeriod}\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "ROI_results.csv");
        document.body.appendChild(link);
        link.click();
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("ROI Calculator Results", 20, 20);
        doc.text(`Total Annual Savings: $${totalAnnualSavings}`, 20, 30);
        doc.text(`Total Costs: $${totalCosts}`, 20, 40);
        doc.text(`3-Year ROI: $${threeYearROI}`, 20, 50);
        doc.text(`Payback Period (Months): ${paybackPeriod}`, 20, 60);
        doc.save("ROI_results.pdf");
    };

    const inputFields = [
        { name: 'Total Employees', value: totalEmployees, setValue: setTotalEmployees },
        { name: 'Software Apps', value: softwareApps, setValue: setSoftwareApps },
        { name: 'Avg Cost Per License', value: avgCostPerLicense, setValue: setAvgCostPerLicense },
        { name: 'New Software Cost', value: newSoftwareCost, setValue: setNewSoftwareCost },
        { name: 'Ex-Employees', value: exEmployees, setValue: setExEmployees },
        { name: 'Avg Onboarding Cost', value: avgOnboardingCost, setValue: setAvgOnboardingCost },
        { name: 'Contractors', value: contractors, setValue: setContractors },
        { name: 'Contractor Rate', value: contractorRate, setValue: setContractorRate },
        { name: 'Contractor Hours', value: contractorHours, setValue: setContractorHours },
        { name: 'Employee Wage', value: employeeWage, setValue: setEmployeeWage },
        { name: 'Manual Task Reduction (%)', value: manualTaskReduction, setValue: setManualTaskReduction },
        { name: 'IT Support Staff', value: itSupportStaff, setValue: setItSupportStaff },
        { name: 'IT Ticket Reduction (%)', value: itTicketReduction, setValue: setItTicketReduction },
        { name: 'Current Server Costs', value: currentServerCosts, setValue: setCurrentServerCosts },
        { name: 'New Server Costs', value: newServerCosts, setValue: setNewServerCosts },
        { name: 'Implementation Cost', value: implementationCost, setValue: setImplementationCost },
    ];

    return (
        <div className="roi-calculator">
    <h1>ROI Calculator</h1>

    {/* Download Buttons at the Top */}
    <div style={{ marginBottom: '20px' }}>
        <button className="btn" onClick={downloadCSV}>Download CSV</button>
        <button className="btn" onClick={downloadPDF}>Download PDF</button>
    </div>

    {/* Displaying Input Fields Horizontally */}
    <div className="input-container">
        {inputFields.map((item, index) => (
            <div key={index} className="input-field">
                <label>{item.name}:</label>
                <input
                    type="number"
                    value={item.value}
                    onChange={(e) => item.setValue(Number(e.target.value))}
                />
            </div>
        ))}
    </div>

    {/* Results Display */}
    <div className="results">
        <h2>Results</h2>
        <p>Total Annual Savings: ${totalAnnualSavings}</p>
        <p>Total Costs: ${totalCosts}</p>
        <p>3-Year ROI: ${threeYearROI}</p>
        <p>Payback Period (Months): {paybackPeriod}</p>
    </div>

    {/* Authentication Buttons */}
    {/* <div className="auth-buttons">
        {user ? (
            <button className="btn" onClick={signOut}>Sign Out</button>
        ) : (
            <button className="btn" onClick={signIn}>Sign In</button>
        )}
    </div> */}
</div>
    );
}
