using ElbilHusvagnLadda.WebApi.Data;
using ElbilHusvagnLadda.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElbilHusvagnLadda.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChargingPointsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ChargingPointsController> _logger;

    public ChargingPointsController(AppDbContext context, ILogger<ChargingPointsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ChargingPoint>>> GetChargingPoints()
    {
        try
        {
            var chargingPoints = await _context.ChargingPoints.ToListAsync();
            return Ok(chargingPoints);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving charging points");
            return StatusCode(500, "An error occurred while retrieving charging points");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ChargingPoint>> GetChargingPoint(int id)
    {
        try
        {
            var chargingPoint = await _context.ChargingPoints.FindAsync(id);

            if (chargingPoint == null)
            {
                return NotFound();
            }

            return Ok(chargingPoint);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving charging point {Id}", id);
            return StatusCode(500, "An error occurred while retrieving the charging point");
        }
    }
}
