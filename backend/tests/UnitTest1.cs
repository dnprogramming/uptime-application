using Microsoft.EntityFrameworkCore;

namespace tests;

public class Tests
{
    private Mock<UptimereportsContext> _mockdb;
    [SetUp]
    public void Setup()
    {
        _mockdb = new Mock<UptimereportsContext>();
    }

    [Test]
    public void Test1()
    {
        var mockContext = new Mock<UptimereportsContext>();

        mockContext.Setup(m => m.Appstatuses);
        mockContext.Setup(m => m.Criticalities);
        mockContext.Setup(m => m.Hosts);

        var initialAppstatus = new Appstatus {};
        mockContext.Object.Appstatuses.Add(initialAppstatus);
        mockContext.Object.SaveChanges();
        Assert.Pass();
    }
}
