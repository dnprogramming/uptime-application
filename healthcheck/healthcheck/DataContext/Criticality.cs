using System;
using System.Collections.Generic;

namespace healthcheck.DataContext;

public partial class Criticality
{
    public int Id { get; set; }

    public string CriticalityLevel { get; set; } = null!;

    public virtual ICollection<Appstatus> Appstatuses { get; set; } = new List<Appstatus>();
}
