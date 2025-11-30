namespace ElbilHusvagnLadda.WebApi.Models;

public class LoginResponse
{
    public required string Token { get; set; }
    public required string Username { get; set; }
}
