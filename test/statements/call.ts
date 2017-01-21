import {statementType} from "../utils";
import * as Statements from "../../src/statements/";

let tests = [
  "cl_gui_cfw=>flush( ).",
  "cl_gui_cfw=>flush( ) .",
  "lif_object~delete( ).",
  "gui( )->go_home( ).",
  "cl_abap_unit_assert=>assert_subrc( msg = 'Error while parsing'(001) ).",
  "CALL METHOD (lv_class_name)=>jump.",
  "call badi lr_badi->method importing ev_foo = lv_moo ev_bar = lv_boo.",
  "<ls_late>-obj->deserialize( iv_package = <ls_late>-package ).",
  "CALL METHOD ('CL_OO_FACTORY')=>('CREATE_INSTANCE').",
  "ro_html->add( |var\"\n| ).",
  "CALL METHOD o_conv->reset( ).",
  "lo_sdf->set_cell( ip_row = 7 ip_column = 'C' ip_value = -10  ).",
  "CALL METHOD lo_instance->('CREATE_CLIF_SOURCE').",
  "ii_client->request->set_header_field( name  = '~request_method' value = 'POST' ).",
  "mo_files->add_string( iv_extra  = 'source' iv_ext    = 'xml' ).",
  "mo_files->add_string( iv_extra  = 'source' ) ##NO_TEXT.",
  "CALL METHOD lo_obj->(lv_method) PARAMETER-TABLE lt_parameters.",
  "CALL METHOD <ls_meta>-obj->(<ls_meta>-meta-handler) PARAMETER-TABLE lt_parameters.",
  "ro_html->add('<thead><tr>').",
  "CALL METHOD (class)=>(meth) PARAMETER-TABLE ptab EXCEPTION-TABLE etab.",
];

statementType(tests, "CALL", Statements.Call);
