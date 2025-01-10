﻿namespace WordCross;
using Npgsql;

public class Actions
{
    private Database _database = new();
    private NpgsqlDataSource _db;

    public Actions(WebApplication app)
    {
        _db = _database.Connection();

        // Map incoming TestWord GET route from client to method
        app.MapGet("/subject-check/{subject}", GetWord);
        app.MapGet("/api/allWords/", GetAllWords);
        app.MapGet("/subject-words/{subject}", GetSubjectWords); 
    }

    async Task<List<string>> GetAllWords()
    {
        var query = @"SELECT name
                      FROM word";

        List<string> words = new();
        await using (var cmd = _db.CreateCommand(query))
        {
            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    words.Add(reader.GetString(0));
                }
            }
        }

        return words;
    }

    // Read a word from the word table in the database
    async Task<string> GetWord(int subject)
    {
        var query = @"SELECT name
                      FROM word
                      WHERE subject_id = $1
                      LIMIT 1";

        await using (var cmd = _db.CreateCommand(query))
        {
            cmd.Parameters.AddWithValue(subject);

            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    return reader.GetString(0);
                }
            }
        }

        return "ERROR";
    }

    // Reads all words from input subject and puts them into a list
    async Task<List<string>> GetSubjectWords(int subject)
    {
        var query = @"SELECT name
                      FROM word
                      WHERE subject_id = $1";

        List<string> words = new();
        await using (var cmd = _db.CreateCommand(query))
        {
            cmd.Parameters.AddWithValue(subject);

            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    words.Add(reader.GetString(0));
                }
            }
        }

        return words;
    }





}

