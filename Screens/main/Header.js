import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { fetchVoziky } from "../../Redux/Action/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

function Header(props) {
  const onRefresh = async () => {
    await props.fetchVoziky();
  };

  return (
    <TouchableOpacity onPress={() => onRefresh()} style={{ paddingRight: 30 }}>
      <AntDesign style={{}} name="reload1" size={25} color="black" />
    </TouchableOpacity>
  );
}

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchVoziky }, dispatch);

export default connect(null, mapDispatchProps)(Header);
