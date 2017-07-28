//
//  OrdeListTableViewCell.swift
//  WeshAdminGQL
//
//  Created by Dino Pelic on 7/23/17.
//  Copyright © 2017 Dino Pelic. All rights reserved.
//

import UIKit

protocol OrderListCellOutput {
    func whichButtonClicked(statusButton: UIButton, orderId: String)
}

class OrdeListTableViewCell: UITableViewCell {
    
    @IBOutlet weak var orderTotal: UILabel!
    @IBOutlet weak var orderLocation: UILabel!
    @IBOutlet weak var orderOwner: UILabel!
    @IBOutlet weak var orderId: UILabel!
    @IBOutlet weak var orderStatus: UILabel!
    
    var output: OrderListCellOutput?
    
    var singleOrder: OrderDetails? {
        didSet {
            orderStatus.text = singleOrder?.orderStatus
            orderId.text = singleOrder?.orderId
            orderLocation.text = singleOrder?.userData?.userCity
            orderOwner.text = singleOrder?.userData?.mobileNum
            orderTotal.text = String(describing: (singleOrder?.basket?.count)!)
        }
    }
    
    // Change order status buttons
    @IBAction func orderZavrsena(_ sender: UIButton) {
        self.output?.whichButtonClicked(statusButton: sender, orderId: self.orderId.text!)
    }
    
    @IBAction func orderUToku(_ sender: UIButton) {
        self.output?.whichButtonClicked(statusButton: sender, orderId: self.orderId.text!)
    }
    
    @IBAction func orderPrimljena(_ sender: UIButton) {
        self.output?.whichButtonClicked(statusButton: sender, orderId: self.orderId.text!)
    }

    override func awakeFromNib() {
        super.awakeFromNib()
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }
}
