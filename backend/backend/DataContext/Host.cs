using System;
using System.Collections.Generic;

namespace backend.DataContext;

public partial class Host
{
    public int Id { get; set; }

    public int AppId { get; set; }

    public string Hostname { get; set; } = null!;

    public virtual Appstatus App { get; set; } = null!;
}
