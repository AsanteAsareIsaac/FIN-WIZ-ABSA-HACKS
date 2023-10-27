const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FinWiz", () => {
    let finWiz;
    let userAccount;

    before(async () => {
        const FinWiz = await ethers.getContractFactory("FinWiz");
        finWiz = await FinWiz.deploy();
        // await finWiz.deployed();
        const [user] = await ethers.getSigners();
        userAccount = user;
    });

    describe("collectData", () => {
        it("should collect data", async () => {
            const location = "Accra, Ghana";
            const date = "2023-01-01";
            const sales = 1000;
            const expenses = 500;

            await finWiz.collectData(location, date, sales, expenses);

            const userData = await finWiz.userData(userAccount.address);
            expect(userData.location).to.equal(location);
            expect(userData.date).to.equal(date);
            expect(userData.sales).to.equal(sales);
            expect(userData.expenses).to.equal(expenses);
        });
    });

    describe("createReport", () => {
        it("should create a report", async () => {
            const date = "2023-01-02";
            const sales = 1500;
            const expenses = 600;

            await finWiz.createReport(date, sales, expenses);

            const userReports = await finWiz.userReports(userAccount.address, 0);
            expect(userReports.date).to.equal(date);
            expect(userReports.sales).to.equal(sales);
            expect(userReports.expenses).to.equal(expenses);
        });
    });

    describe("calculateCreditScore", () => {
        it("should calculate user's credit score using global bank standards", async () => {

            // Get credit score
            const creditScore = await finWiz.calculateCreditScore();

            // Get user's credit score
            const userCreditScore = await finWiz.userCreditScores(
                userAccount.address
            );

            // Log results
            console.log(`creditScore: ${creditScore}`);
            console.log(`userCreditScore: ${userCreditScore.score}`);

            // Test results
            expect(userCreditScore.score).to.be.a("number");
            expect(creditScore).to.be.greaterThan(300);
            expect(creditScore).to.be.lessThan(850);

            return calculateCreditScore;
        });
    });

});
