using System;
using System.Collections.Generic;

namespace healthcheck.DataContext;

public partial class Appstatus
{
    public int Id { get; set; }

    public string Appname { get; set; } = null!;

    public string Responsibility { get; set; } = null!;

    public int Currentappstatus { get; set; }

    public int CriticalityId { get; set; }

    public DateTime Lastupdated { get; set; }

    public virtual Criticality Criticality { get; set; } = null!;

    public virtual ICollection<Host> Hosts { get; set; } = new List<Host>();
}
