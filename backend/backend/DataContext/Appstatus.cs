using System;
using System.Collections.Generic;

namespace backend.DataContext;

public partial class Appstatus
{
    public int Id { get; set; }

    public string Appname { get; set; } = null!;

    public string Responsibility { get; set; } = null!;

    public int Currentappstatus { get; set; }

    public DateTime Lastupdated { get; set; }
}
