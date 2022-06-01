import * as Structures from ".";
import * as Statements from "../../2_statements/statements";
import {IStructure} from "./_structure";
import {alt, sta, sub} from "./_combi";
import {MacroCall} from "../../2_statements/statements/_statement";
import {IStructureRunnable} from "./_structure_runnable";

export class Normal implements IStructure {

  public getMatcher(): IStructureRunnable {
// note that the sequence of alternatives here influences performance
    return alt(sta(Statements.Move),
               sta(Statements.Call),
               sta(Statements.Data),
               sub(Structures.If),
               sta(Statements.Clear),
               sta(Statements.FieldSymbol),
               sta(Statements.CreateObject),
               sta(Statements.CallFunction),
               sta(MacroCall),
               sub(Structures.LoopAtScreen),
               sub(Structures.Loop),
               sta(Statements.Append),
               sub(Structures.Try),
               sta(Statements.ReadTable),
               sta(Statements.Assert),
               sta(Statements.Return),
               sta(Statements.Select),
               sta(Statements.Assign),
               sta(Statements.InsertInternal),
               sta(Statements.DeleteInternal),
               sta(Statements.Concatenate),
               sub(Structures.Case),
               sub(Structures.CaseType),
               sub(Structures.Enhancement),
               sub(Structures.EnhancementSection),

               sta(Statements.AddCorresponding),
               sta(Statements.Add),
               sta(Statements.AssignLocalCopy),
               sta(Statements.AuthorityCheck),
               sta(Statements.Back),
               sta(Statements.Break),
               sta(Statements.BreakId),
               sta(Statements.CallDatabase),
               sta(Statements.CallDialog),
               sta(Statements.CallKernel),
               sta(Statements.CallOLE),
               sta(Statements.CallScreen),
               sta(Statements.ModifyScreen),
               sta(Statements.CallSelectionScreen),
               sta(Statements.CallTransaction),
               sta(Statements.CallTransformation),
               sta(Statements.Check),
               sta(Statements.ClassDefinitionLoad),
               sta(Statements.CloseCursor),
               sta(Statements.CloseDataset),
               sta(Statements.Collect),
               sta(Statements.Commit),
               sta(Statements.Communication),
               sta(Statements.Compute),
               sta(Statements.CallBadi),
               sta(Statements.Condense),
               sta(Statements.Constant),
               sta(Statements.Contexts),
               sta(Statements.Continue),
               sta(Statements.ConvertText),
               sta(Statements.Convert),
               sta(Statements.CreateData),
               sta(Statements.CreateOLE),
               sta(Statements.DeleteCluster),
               sta(Statements.DeleteDatabase),
               sta(Statements.DeleteDataset),
               sta(Statements.DeleteDynpro),
               sta(Statements.DeleteMemory),
               sta(Statements.DeleteReport),
               sta(Statements.DeleteTextpool),
               sta(Statements.Demand),
               sta(Statements.Describe),
               sta(Statements.Detail),
               sta(Statements.Divide),
               sta(Statements.EditorCall),
               sta(Statements.EnhancementPoint),
               sta(Statements.Exit),
               sta(Statements.ExportDynpro),
               sta(Statements.Export),
               sta(Statements.Extract),
               sta(Statements.FetchNextCursor),
               sta(Statements.FieldGroup),
               sta(Statements.Fields),
               sta(Statements.Find),
               sta(Statements.Format),
               sta(Statements.FreeMemory),
               sta(Statements.FreeObject),
               sta(Statements.Free),
               sta(Statements.GenerateDynpro),
               sta(Statements.GenerateReport),
               sta(Statements.GenerateSubroutine),
               sta(Statements.GetBadi),
               sta(Statements.GetBit),
               sta(Statements.GetCursor),
               sta(Statements.GetDataset),
               sta(Statements.GetLocale),
               sta(Statements.GetParameter),
               sta(Statements.GetPFStatus),
               sta(Statements.GetProperty),
               sta(Statements.GetReference),
               sta(Statements.GetRunTime),
               sta(Statements.GetTime),
               sta(Statements.Hide),
               sta(Statements.Nodes),
               sta(Statements.ImportDynpro),
               sta(Statements.ImportNametab),
               sta(Statements.MoveCorresponding),
               sta(Statements.Import),
               sta(Statements.Infotypes),
               sta(Statements.Include), // include does not have to be at top level
               sta(Statements.InsertDatabase),
               sta(Statements.InsertReport),
               sta(Statements.InsertTextpool),
               sta(Statements.InsertFieldGroup),
               sta(Statements.InterfaceLoad),
               sta(Statements.Leave),
               sta(Statements.LoadReport),
               sta(Statements.Local),
               sta(Statements.With),
               sta(Statements.LogPoint),
               sta(Statements.Message),
               sta(Statements.ModifyLine),
               sta(Statements.ModifyDatabase),
               sta(Statements.ModifyInternal),
               sta(Statements.Multiply),
               sta(Statements.NewLine),
               sta(Statements.NewPage),
               sta(Statements.OpenCursor),
               sta(Statements.OpenDataset),
               sta(Statements.Overlay),
               sta(Statements.Pack),
               sta(Statements.Perform),
               sta(Statements.Position),
               sta(Statements.Put),
               sta(Statements.PrintControl),
               sta(Statements.RaiseEvent),
               sta(Statements.Raise),
               sta(Statements.Ranges),
               sta(Statements.ReadDataset),
               sta(Statements.ReadLine),
               sta(Statements.ReadReport),
               sta(Statements.ReadTextpool),
               sta(Statements.Receive),
               sta(Statements.RefreshControl),
               sta(Statements.Refresh),
               sta(Statements.Reject),
               sta(Statements.Replace),
               sta(Statements.Reserve),
               sta(Statements.Resume),
               sta(Statements.Retry),
               sta(Statements.Rollback),
               sta(Statements.Scan),
               sta(Statements.ScrollList),
               sta(Statements.Search),
               sta(Statements.SetBit),
               sta(Statements.SetBlank),
               sta(Statements.SetCountry),
               sta(Statements.SetCursor),
               sta(Statements.SetDataset),
               sta(Statements.SetExtendedCheck),
               sta(Statements.SetHandler),
               sta(Statements.SetLanguage),
               sta(Statements.SetLeft),
               sta(Statements.SetLocale),
               sta(Statements.SetMargin),
               sta(Statements.SetParameter),
               sta(Statements.SetPFStatus),
               sta(Statements.SetProperty),
               sta(Statements.SetRunTime),
               sta(Statements.SetScreen),
               sta(Statements.SetTitlebar),
               sta(Statements.SetUserCommand),
               sta(Statements.SetUpdateTask),
               sta(Statements.Shift),
               sta(Statements.Skip),
               sta(Statements.SortDataset),
               sta(Statements.Sort),
               sta(Statements.Static),
               sta(Statements.Split),
               sta(Statements.Stop),
               sta(Statements.Submit),
               sta(Statements.Summary),
               sta(Statements.SubtractCorresponding),
               sta(Statements.Subtract),
               sta(Statements.SuppressDialog),
               sta(Statements.Supply),
               sta(Statements.Sum),
               sta(Statements.SyntaxCheck),
               sta(Statements.SystemCall),
               sta(Statements.Tables),
               sta(Statements.Transfer),
               sta(Statements.Translate),
               sta(Statements.Type),
               sta(Statements.TypePools),
               sta(Statements.Uline),
               sta(Statements.Unassign),
               sta(Statements.Unpack),
               sta(Statements.UpdateDatabase),
               sta(Statements.Wait),
               sta(Statements.Window),
               sta(Statements.Write),
               sta(Statements.CommitEntities),
               sta(Statements.GetPermissions),
               sta(Statements.SetLocks),
               sta(Statements.ModifyEntities),
               sta(Statements.ReadEntities),
               sta(Statements.RollbackEntities),

               sub(Structures.Define),
               sub(Structures.TestInjection),
               sub(Structures.TestSeam),
               sub(Structures.TypeMesh),
               sub(Structures.Provide),
               sub(Structures.CatchSystemExceptions),
               sub(Structures.At),
               sub(Structures.Constants),
               sub(Structures.Types),
               sub(Structures.Statics),
               sub(Structures.Select),
               sub(Structures.Data),
               sub(Structures.TypeEnum),
               sub(Structures.While),
               sub(Structures.With),
               sub(Structures.Do),
               sub(Structures.ExecSQL));
  }

}