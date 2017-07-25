//  This file was automatically generated and should not be edited.

import Apollo

public final class AllOrdersQuery: GraphQLQuery {
  public static let operationDefinition =
    "query AllOrders {" +
    "  orders {" +
    "    __typename" +
    "    ...OrderDetails" +
    "  }" +
    "}"
  public static let queryDocument = operationDefinition.appending(OrderDetails.fragmentDefinition)
  public init() {
  }

  public struct Data: GraphQLMappable {
    public let orders: [Order?]?

    public init(reader: GraphQLResultReader) throws {
      orders = try reader.optionalList(for: Field(responseName: "orders"))
    }

    public struct Order: GraphQLMappable {
      public let __typename: String

      public let fragments: Fragments

      public init(reader: GraphQLResultReader) throws {
        __typename = try reader.value(for: Field(responseName: "__typename"))

        let orderDetails = try OrderDetails(reader: reader)
        fragments = Fragments(orderDetails: orderDetails)
      }

      public struct Fragments {
        public let orderDetails: OrderDetails
      }
    }
  }
}

public final class ChangeOrderStatusMutation: GraphQLMutation {
  public static let operationDefinition =
    "mutation ChangeOrderStatus($orderId: String!, $newStatus: String!) {" +
    "  changeOrderStatus(orderId: $orderId, newStatus: $newStatus)" +
    "}"

  public let orderId: String
  public let newStatus: String

  public init(orderId: String, newStatus: String) {
    self.orderId = orderId
    self.newStatus = newStatus
  }

  public var variables: GraphQLMap? {
    return ["orderId": orderId, "newStatus": newStatus]
  }

  public struct Data: GraphQLMappable {
    public let changeOrderStatus: Bool?

    public init(reader: GraphQLResultReader) throws {
      changeOrderStatus = try reader.optionalValue(for: Field(responseName: "changeOrderStatus", arguments: ["orderId": reader.variables["orderId"], "newStatus": reader.variables["newStatus"]]))
    }
  }
}

public struct OrderDetails: GraphQLNamedFragment {
  public static let fragmentDefinition =
    "fragment OrderDetails on BasketSingleOrder {" +
    "  __typename" +
    "  orderId" +
    "  orderStatus" +
    "  userData {" +
    "    __typename" +
    "    userCity" +
    "    mobileNum" +
    "  }" +
    "  basket {" +
    "    __typename" +
    "    item" +
    "  }" +
    "}"

  public static let possibleTypes = ["BasketSingleOrder"]

  public let __typename: String
  public let orderId: String?
  public let orderStatus: String?
  public let userData: UserDatum?
  public let basket: [Basket?]?

  public init(reader: GraphQLResultReader) throws {
    __typename = try reader.value(for: Field(responseName: "__typename"))
    orderId = try reader.optionalValue(for: Field(responseName: "orderId"))
    orderStatus = try reader.optionalValue(for: Field(responseName: "orderStatus"))
    userData = try reader.optionalValue(for: Field(responseName: "userData"))
    basket = try reader.optionalList(for: Field(responseName: "basket"))
  }

  public struct UserDatum: GraphQLMappable {
    public let __typename: String
    public let userCity: String?
    public let mobileNum: String?

    public init(reader: GraphQLResultReader) throws {
      __typename = try reader.value(for: Field(responseName: "__typename"))
      userCity = try reader.optionalValue(for: Field(responseName: "userCity"))
      mobileNum = try reader.optionalValue(for: Field(responseName: "mobileNum"))
    }
  }

  public struct Basket: GraphQLMappable {
    public let __typename: String
    public let item: String?

    public init(reader: GraphQLResultReader) throws {
      __typename = try reader.value(for: Field(responseName: "__typename"))
      item = try reader.optionalValue(for: Field(responseName: "item"))
    }
  }
}