const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FinWiz", () => {
    let finWiz;

    before(async () => {
        const FinWiz = await ethers.getContractFactory("FinWiz");
        finWiz = await FinWiz.deploy();
        // await finWiz.deployed();
    });

    describe("collectData", () => {
        it("should collect data", async () => {
            const userAccount = await ethers.getSigner(0);
            const location = "Location";
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
            const userAccount = await ethers.getSigner(0);
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
        it("should calculate a credit score", async () => {
            const userAccount = await ethers.getSigner(0);

            await finWiz.calculateCreditScore();

            const userCreditScore = await finWiz.userCreditScores(userAccount.address);
            expect(userCreditScore.score).to.be.greaterThan(0);
        });
    });
});
